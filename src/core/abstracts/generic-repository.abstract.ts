export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
    
    abstract get(id: string): Promise<T>;
  
    abstract create(item: T): Promise<T>;
  
    abstract update(id: string, item: T): Promise<T>;

    abstract delete(id: string): any;
}

export abstract class IGenericFavoritesRepository<T> {
    abstract getAll(): Promise<any>;
  
    abstract addTrack(id: string): Promise<any>;
  
    abstract deleteTrack(id: string): Promise<any>;

    abstract addAlbum(id: string): Promise<any>;
  
    abstract deleteAlbum(id: string): Promise<any>;

    abstract addArtist(id: string): Promise<any>;
  
    abstract deleteArtist(id: string): Promise<any>;
}