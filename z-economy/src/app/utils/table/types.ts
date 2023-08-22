type TextType = 'other' | 'numeric' | 'text' | 'category';

export interface TextTypeInterface {
  getType: () => TextType;
}

export class NumericTextType implements TextTypeInterface {
  getType(): TextType {
    return 'numeric';
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

export class CategoryType implements TextTypeInterface {
  getType(): TextType {
    return 'category';
  }
}
