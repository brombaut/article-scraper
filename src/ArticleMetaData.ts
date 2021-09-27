// TODO: brombaut/types?
interface Tag {
  name: string;
  href: string;
  color: string;
  backgroundColor: string;
};

class ArticleMetaData {
  title: string;
  minuteRead: number;
  tags: Tag[];
  url: string;
  errors: string[];

  constructor(url: string) {
    this.title = '';
    this.minuteRead = 0;
    this.tags = [];
    this.url = url;
    this.errors = [];
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public addError(e: string) {
    this.errors.push(e);
  }
};

export { Tag, ArticleMetaData };