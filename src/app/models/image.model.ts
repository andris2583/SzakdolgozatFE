export interface Image {
  id: string;
  name: string;
  extension: string;
  location: string;
  categories: string[];
  uploaded: Date;
  imgB64: string;
}
