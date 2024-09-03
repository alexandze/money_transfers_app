export enum CalculationType {
  Multiply = 'multiply',
  Divide = 'divide',
}
export interface Rate {
  [key: string]: { value: number; calculationType: CalculationType };
}
