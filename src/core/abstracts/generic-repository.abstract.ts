export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
    
    abstract get(id: string): Promise<T>;
  
    abstract create(item: T): Promise<T>;
  
    abstract update(id: string, item: T);

    abstract delete(id: string);
}

export abstract class IGenericFavoritesRepository<T> {
    abstract getAll(): Promise<T[]>;
  
    abstract addTrack(item: T): Promise<T>;
  
    abstract deleteTrack(id: string);

    abstract addAlbum(item: T): Promise<T>;
  
    abstract deleteAlbum(id: string);

    abstract addArtist(item: T): Promise<T>;
  
    abstract deleteArtist(id: string);
}