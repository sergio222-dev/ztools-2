export const responseToJson = <T>(response: Response): Promise<T> => response.json();
