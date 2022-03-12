/**
 * Cria texto aleatorio com o tamanho solicitado.
 * @param length tamanho da string solicitada
 * @param initialKey indice da primeira letra
 * @returns 
 */
const makeNewKey = (length, initialKey?): string => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() *
      charactersLength)
      const index = initialKey && i == 0 ?  initialKey: randomIndex;
      result += characters.charAt(index);
    }
    return result;
  }


export const Random = {
  makeNewKey
}