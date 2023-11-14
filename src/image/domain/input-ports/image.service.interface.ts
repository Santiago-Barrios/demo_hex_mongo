export interface IImageService {
    create(url: string, productId: string): Promise<void>;
}