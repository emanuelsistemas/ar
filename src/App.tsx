

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Acesso Remoto</h1>
        <p className="text-gray-600 mb-6 text-center">Bem-vindo à página de acesso remoto. Selecione uma das opções abaixo:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/public/solucao-completa.html" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-center transition-colors">
            Solução Completa
          </a>
          <a href="#" className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-center transition-colors">
            Outra Opção
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;