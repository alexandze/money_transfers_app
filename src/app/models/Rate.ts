export enum CalculationType {
  Multiply = 'multiply',
  Divide = 'divide',
}

export interface Rate {
  type: string;
  value: number;
  calculationType: CalculationType;
  fee: number;
}
