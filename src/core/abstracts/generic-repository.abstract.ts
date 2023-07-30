export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
    
    abstract get(id: string): Promise<T>;
  
    abstract create(item: T): Promise<T>;
  
    abstract update(id: string, item: T): Promise<T>;

    abstract delete(id: string): any;
}

export abstract class IGenericFavoritesRepository<T> {
    abstract getAll(): Promise<T[]>;
  
    abstract addTrack(item: T): Promise<T>;
  
    abstract deleteTrack(id: string): any;

    abstract addAlbum(item: T): Promise<T>;
  
    abstract deleteAlbum(id: string): any;

    abstract addArtist(item: T): Promise<T>;
  
    abstract deleteArtist(id: string): any;
}