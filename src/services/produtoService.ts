import axios from "axios";

async function atualizarEstoqueProduto(id: string, novoEstoque: number, outrosDadosProduto: any) {
  try {
    await axios.put(
      `http://localhost:5002/update-product/${id}`,
      {
        ...outrosDadosProduto,
        quantidadeEstoque: novoEstoque,
      }
    );
    // Sucesso!
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
  }
}

export async function buscarProdutoPorId(id: string) {
  try {
    const response = await axios.get(`http://localhost:5002/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}