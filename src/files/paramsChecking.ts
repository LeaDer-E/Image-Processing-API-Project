import { theArrayItems, isArrayNumbers } from './arrays';

interface ImageQuery {
  filename: string;
  height: number;
  width: number;
}

const paramsChecking = (imgquery: ImageQuery): boolean => {
  const HightAndWidth: number[] = [
    Number(imgquery.width),
    Number(imgquery.height),
  ];
  const keysOfParams: string[] = Object.keys(imgquery);
  // check if all 3 parameters are set in the URL
  const params: string[] = ['filename', 'width', 'height'];

  // If all required parameters (params) are included in the query (keysOfParams) and if width and height are both numeric check if there is
  return theArrayItems(params, keysOfParams) && isArrayNumbers(HightAndWidth);
};

export { paramsChecking, ImageQuery };
