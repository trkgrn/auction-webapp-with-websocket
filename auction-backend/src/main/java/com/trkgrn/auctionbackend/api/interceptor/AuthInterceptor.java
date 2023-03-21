package com.trkgrn.auctionbackend.api.interceptor;

import com.trkgrn.auctionbackend.api.exception.ExpiredJwtExc;
import com.trkgrn.auctionbackend.api.exception.NullPointerExc;
import com.trkgrn.auctionbackend.api.model.entity.Token;
import com.trkgrn.auctionbackend.api.service.TokenService;
import com.trkgrn.auctionbackend.api.security.jwt.service.JwtUtil;
import com.trkgrn.auctionbackend.api.security.userdetail.CustomUserDetails;
import com.trkgrn.auctionbackend.api.security.userdetail.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private static Logger log = LoggerFactory.getLogger(AuthInterceptor.class);

    private final TokenService tokenService;

    private final JwtUtil jwtUtil;

    private final CustomUserDetailsService userDetailsService;

    @Value("${jwt.refresh.expire.hours}")
    Long expireHours;

    public AuthInterceptor(TokenService tokenService, JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (request.getHeader("Authorization") != null) {
            String jwt = request.getHeader("Authorization").substring(7);
            String tckNo = "";
            Token tokenObj;
            try {
                tckNo = jwtUtil.extractUsername(jwt);
                tokenObj = tokenService.findTokenByUsername(tckNo);
            } catch (NullPointerException e) {
                throw new NullPointerExc("Oturum süresi sona erdi.");
            } catch (ExpiredJwtException e) {
                throw new ExpiredJwtExc("Oturun süresi sona erdi.");
            }
            if (jwt.equals(tokenObj.getJwt())) { // request headerından gelen token rediste bulunuyor mu?
               // System.out.println("kalansüre: "+jwtUtil.tokenExpiredHours(jwt)+" expr:"+expireHours);
                if(jwtUtil.tokenExpiredHours(jwt) < 6L){ // token'ın kalan süresi 6 saatten az ise
                    //Refresh Token
                    final CustomUserDetails userDetails = userDetailsService.loadUserByUsername(tckNo);
                    final String refreshJwt = jwtUtil.generateToken(userDetails,expireHours);
                    // rediste kaydet
                    tokenService.save(new Token(tckNo,refreshJwt),expireHours);

                    System.out.println("kalansüre: "+jwtUtil.tokenExpiredHours(jwt)+" expr:"+expireHours);

                    log.info("Token yenilendi");

                    response.addHeader("refreshToken",refreshJwt);
                    response.addHeader("Access-Control-Expose-Headers", "refreshToken");
                }
            }
            else{ // oturumu sonlandır
                response.setStatus(401);
                return false;
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request,response,handler,modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }



}
