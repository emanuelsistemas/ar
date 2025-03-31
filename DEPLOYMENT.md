# Guia de Implantação - Página de Acesso Remoto

Este documento contém instruções detalhadas sobre como configurar e implantar a Página de Acesso Remoto em diferentes ambientes.

## Sumário
1. [Implantação em Ambiente de Desenvolvimento](#implantação-em-ambiente-de-desenvolvimento)
2. [Implantação em Ambiente de Produção](#implantação-em-ambiente-de-produção)
3. [Configuração do NGINX](#configuração-do-nginx)
4. [Configuração SSL/TLS](#configuração-ssltls)
5. [Manutenção e Backup](#manutenção-e-backup)
6. [Solução de Problemas Comuns](#solução-de-problemas-comuns)

## Implantação em Ambiente de Desenvolvimento

### Usando Servidor HTTP Python
```bash
# Navegue até o diretório do projeto
cd /root/PAGINA_ACESSO_REMOTO

# Inicie o servidor HTTP na porta 5002
python3 -m http.server 5002
```

### Usando Vite/React
```bash
# Navegue até o diretório do projeto
cd /root/PAGINA_ACESSO_REMOTO

# Instale as dependências (se ainda não tiver feito)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A configuração do Vite está definida para usar a porta 5002, conforme especificado no arquivo `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    host: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

## Implantação em Ambiente de Produção

### 1. Preparação do Servidor

```bash
# Atualizar o sistema
sudo apt update
sudo apt upgrade -y

# Instalar o NGINX (se ainda não estiver instalado)
sudo apt install nginx -y

# Criar diretório para a aplicação
sudo mkdir -p /var/www/ar.emasoftware.io

# Copiar os arquivos para o diretório de produção
sudo cp -r /root/PAGINA_ACESSO_REMOTO/* /var/www/ar.emasoftware.io/

# Definir permissões adequadas
sudo chown -R www-data:www-data /var/www/ar.emasoftware.io
sudo chmod -R 755 /var/www/ar.emasoftware.io
```

### 2. Clonar do Repositório Git (alternativa)

```bash
# Navegar para o diretório web
cd /var/www/

# Clonar o repositório
sudo git clone https://github.com/emanuelsistemas/ar.git ar.emasoftware.io

# Definir permissões
sudo chown -R www-data:www-data /var/www/ar.emasoftware.io
sudo chmod -R 755 /var/www/ar.emasoftware.io
```

## Configuração do NGINX

### 1. Criar Arquivo de Configuração

```bash
sudo nano /etc/nginx/sites-available/ar.conf
```

Conteúdo do arquivo:

```nginx
server {
    listen 80;
    server_name ar.emasoftware.io;

    root /var/www/ar.emasoftware.io/public;
    index static.html index.html;

    location / {
        try_files $uri $uri/ /static.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
}
```

### 2. Ativar o Site

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/ar.conf /etc/nginx/sites-enabled/

# Verificar a sintaxe da configuração
sudo nginx -t

# Recarregar o NGINX
sudo systemctl reload nginx
```

### 3. Configuração de Firewall (se necessário)

```bash
# Permitir tráfego HTTP e HTTPS
sudo ufw allow 'Nginx Full'
```

## Configuração SSL/TLS

### Usando Certbot (Let's Encrypt)

```bash
# Instalar o Certbot e o plugin do NGINX
sudo apt install certbot python3-certbot-nginx -y

# Obter e configurar o certificado
sudo certbot --nginx -d ar.emasoftware.io

# Seguir as instruções na tela
# O Certbot modificará automaticamente o arquivo de configuração do NGINX
```

### Configuração Manual com Certificados Existentes

Se você já possui certificados SSL, adicione o seguinte ao bloco `server` no arquivo de configuração:

```nginx
listen 443 ssl;
ssl_certificate /caminho/para/certificado.crt;
ssl_certificate_key /caminho/para/chave_privada.key;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
```

## Manutenção e Backup

### Backup da Configuração

```bash
# Backup da configuração do NGINX
sudo cp /etc/nginx/sites-available/ar.conf /etc/nginx/sites-available/ar.conf.bak

# Backup dos arquivos da aplicação
sudo cp -r /var/www/ar.emasoftware.io /var/www/ar.emasoftware.io.bak
```

### Atualização da Aplicação

```bash
# Navegar até o diretório do projeto
cd /var/www/ar.emasoftware.io

# Puxar as alterações mais recentes (se usando Git)
sudo git pull origin main

# Ou copiar arquivos atualizados manualmente
sudo cp -r /caminho/para/novos/arquivos/* /var/www/ar.emasoftware.io/

# Atualizar permissões
sudo chown -R www-data:www-data /var/www/ar.emasoftware.io
```

## Solução de Problemas Comuns

### Página em Branco ou Erro 500

Possíveis causas e soluções:

1. **Problemas de Permissão**
   ```bash
   # Verificar permissões
   ls -la /var/www/ar.emasoftware.io/
   
   # Corrigir permissões se necessário
   sudo chown -R www-data:www-data /var/www/ar.emasoftware.io
   sudo chmod -R 755 /var/www/ar.emasoftware.io
   ```

2. **Erros de Configuração do NGINX**
   ```bash
   # Verificar logs de erro
   sudo tail -n 50 /var/log/nginx/error.log
   
   # Verificar configuração
   sudo nginx -t
   ```

3. **Arquivos Ausentes ou Paths Incorretos**
   ```bash
   # Verificar a estrutura de diretórios
   ls -la /var/www/ar.emasoftware.io/public/
   
   # Confirmar a existência do arquivo principal
   cat /var/www/ar.emasoftware.io/public/static.html | head
   ```

### Problemas com SSL/HTTPS

1. **Certificado Expirado**
   ```bash
   # Renovar certificados Let's Encrypt
   sudo certbot renew
   ```

2. **Redirecionamento não Funciona**
   Verifique a configuração de redirecionamento no arquivo de configuração NGINX.

---

Documento criado em: 31 de março de 2025
Última atualização: 31 de março de 2025
