export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
    
    abstract get(id: string): Promise<T>;
  
    abstract create(item: T): Promise<T>;
  
    abstract update(id: string, item: T): Promise<T>;

    abstract delete(id: string): any;
}

export abstract class IGenericFavoritesRepository<T> {
    abstract getAll(): Promise<T>;
  
    abstract addTrack(id: string): any;
  
    abstract deleteTrack(id: string): any;

    abstract addAlbum(id: string): any;
  
    abstract deleteAlbum(id: string): any;

    abstract addArtist(id: string): any;
  
    abstract deleteArtist(id: string): any;
}