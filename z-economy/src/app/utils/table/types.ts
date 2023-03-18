type TextType = 'other' | 'numeric' | 'text';

export interface TextTypeInterface {
  getType: () => TextType;
}

export class NumericTextType implements TextTypeInterface {
  getType(): TextType {
    return 'text';
  }
}

export class TextTextType implements TextTypeInterface {
  getType(): TextType {
    return 'text';
  }
}

export class OtherTextType implements TextTypeInterface {
  getType(): TextType {
    return 'other';
  }
}
