// Título
// Imagem (apenas uma é suficiente)
// Preço (Se mais de 1 preço, pode ser o preço em destaque)
// Descrição
// URL
export interface ProductDTO {
  title: string,
  image: string,
  price: number,
  description: string,
  url: string,
  updatedAt: Date,
}