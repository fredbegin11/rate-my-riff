import StorageClient from '../services/StorageClient';

export interface RiffProps {
  id: string;
  name: string;
  rating: string;
  author: string;
  creationDate: number;
  fileName: string;
}

class Riff {
  id: string;
  name: string;
  rating: string;
  author: string;
  creationDate: number;
  fileName: string;
  url?: string;

  constructor(props: RiffProps) {
    this.id = props.id;
    this.name = props.name;
    this.rating = props.rating;
    this.author = props.author;
    this.creationDate = props.creationDate;
    this.fileName = props.fileName;
  }

  async getUrl() {
    return this.fileName ? StorageClient.getFileUrl(this.fileName) : '';
  }
}

export default Riff;
