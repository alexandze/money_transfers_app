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
}
