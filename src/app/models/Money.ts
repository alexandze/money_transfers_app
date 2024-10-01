import { CalculationType, Rate } from './Rate';

export class Money {
  public static convert(amount: number, rate: Rate) {
    const { calculationType, value } = rate;

    switch (calculationType) {
      case CalculationType.Multiply:
        return amount * value;
      case CalculationType.Divide:
        return amount / value;
      default:
        return -1;
    }
  }

  public static calculateTotal(sendAmount: number, fee: number): number {
    return this.roundTo(sendAmount + fee, 2);
  }

  private static roundTo(num: number, places: number) {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
  }
}
