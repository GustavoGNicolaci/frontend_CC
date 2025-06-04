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