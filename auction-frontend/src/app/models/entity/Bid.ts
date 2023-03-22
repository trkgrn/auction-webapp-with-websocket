export class Bid {
  bidId?: string;
  bidderUsername?: string;
  bidPrice?: number;
  bidDate?: string;

  constructor(bidId?: string, bidderUsername?: string, bidPrice?: number, bidDate?: string) {
    this.bidId = bidId;
    this.bidderUsername = bidderUsername;
    this.bidPrice = bidPrice;
    this.bidDate = bidDate;
  }
}
