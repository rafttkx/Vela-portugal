# Guia: Compilar APK do Vela Portugal

O projeto Vela Portugal foi configurado com **Capacitor** para ser compilado como app Android nativa (.apk). Existem várias formas de compilar:

## Opção 1: Usar Codemagic (Recomendado - Gratuito)

**Codemagic** é um serviço cloud que compila apps Android gratuitamente.

### Passos:

1. **Aceda a:** https://codemagic.io/
2. **Faça login** com GitHub (ou crie conta)
3. **Conecte o repositório** do projeto Vela Portugal
4. **Configure o build:**
   - Selecione `Android` como plataforma
   - Escolha `Gradle` como build tool
   - Defina o output como `APK`
5. **Inicie o build** e aguarde (~5-10 minutos)
6. **Descarregue o ficheiro .apk** gerado

## Opção 2: Usar App Center (Microsoft - Gratuito)

**App Center** é outra alternativa cloud da Microsoft.

1. **Aceda a:** https://appcenter.ms/
2. **Faça login** com conta Microsoft ou GitHub
3. **Crie um novo app** e selecione Android
4. **Conecte o repositório** do Vela Portugal
5. **Configure o build** para gerar APK
6. **Descarregue o APK** após compilação

## Opção 3: Compilar Localmente (Avançado)

Se preferir compilar no seu computador:

### Requisitos:
- Java 17+ instalado
- Android SDK instalado
- Gradle instalado

### Passos:

```bash
# 1. Navegue até à pasta do projeto
cd vela-portugal

# 2. Compile o projeto web
pnpm build

# 3. Copie os assets para a pasta dist
cp dist/public/index.html dist/
cp -r dist/public/assets dist/

# 4. Atualize o Capacitor
npx cap sync android

# 5. Compile o APK
cd android
./gradlew assembleDebug

# 6. O APK estará em:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## Opção 4: Usar Expo EAS Build (Fácil)

Se quiser usar Expo (mais simples):

1. **Instale Expo CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Faça login:**
   ```bash
   eas login
   ```

3. **Configure o projeto:**
   ```bash
   eas build --platform android
   ```

4. **Descarregue o APK** do link fornecido

## Ficheiros do Projeto

O projeto Capacitor está configurado em:
- **Configuração:** `/android/` (pasta com projeto Android)
- **Ficheiro de config:** `capacitor.config.ts`
- **Web assets:** `dist/` (gerado após `pnpm build`)

## Informações da App

- **Nome:** Vela Portugal
- **Package ID:** com.velaportugal.app
- **Versão:** 1.0.0
- **Plataforma:** Android

## Próximos Passos

Após compilar o APK:

1. **Transfira o ficheiro .apk** para o seu telemóvel Android
2. **Ative instalação de fontes desconhecidas** (Definições > Segurança)
3. **Abra o ficheiro .apk** e instale
4. **Abra a app** e aproveite!

## Suporte

Se encontrar problemas:
- Verifique se tem Java 17+ instalado
- Certifique-se de que o Android SDK está configurado
- Consulte a documentação do Capacitor: https://capacitorjs.com/docs/getting-started

---

**Criado em:** 30 de Maio de 2026
**Projeto:** Vela Portugal - Vento e Marés em Tempo Real
