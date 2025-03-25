import React from 'react';
import { Download, MonitorDown } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Ferramentas de Acesso Remoto</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-4xl">
        {/* RustDesk Card */}
        <a 
          href="https://yizqriyqioovhwijwumm.supabase.co/storage/v1/object/public/files/07e86138-c4f8-4de5-81ab-bfe18fd6e666/0.6438339188635249.exe"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-1/2 bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 transition-all duration-300 flex flex-col items-center group"
        >
          <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
            <img 
              src="https://avatars.githubusercontent.com/u/71636191?v=4" 
              alt="RustDesk Logo" 
              className="w-32 h-32 object-contain rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">RustDesk</h2>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            <span>Baixar RustDesk</span>
          </button>
        </a>

        {/* AnyDesk Card */}
        <a 
          href="https://download.anydesk.com/AnyDesk.exe"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-1/2 bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 transition-all duration-300 flex flex-col items-center group"
        >
          <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
            <img 
              src="https://img.icons8.com/?size=512&id=cDG2YNX6xhA6&format=png" 
              alt="AnyDesk Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">AnyDesk</h2>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            <span>Baixar AnyDesk</span>
          </button>
        </a>
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>Escolha a ferramenta de sua preferência para iniciar o acesso remoto</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <MonitorDown className="w-5 h-5" />
          <span>Suporte técnico profissional</span>
        </div>
        <p className="mt-2 text-sm">by Emanuel Souza | ValeSis</p>
      </footer>
    </div>
  );
}

export default App;
