function gerarCPF() {
  const digitos = [];

  for (let index = 0; index < 9; index++) {
    digitos.push(Math.floor(Math.random() * 10));
  }

  const somar = (peso) =>
    digitos.reduce((soma, digito, index) => soma + digito * (peso - index), 0);

  const digitoValidador1 = 11 - (somar(10) % 11);
  digitos.push(digitoValidador1 >= 10 ? 0 : digitoValidador1);

  const digitoValidador2 = 11 - (somar(11) % 11);
  digitos.push(digitoValidador2 >= 10 ? 0 : digitoValidador2);

  return digitos.toString().replaceAll(",", "");
}

function gerarCNPJ() {
  let digitos = [1, 0, 0, 0];

  for (let index = 0; index < 8; index++) {
    digitos.push(Math.floor(Math.random() * 10));
  }

  const somar = (inicio, fim) =>
    [...digitos]
      .splice(inicio, fim)
      .reduce((soma, digito, index) => soma + digito * (index + 2), 0);

  const digitoValidador1 = 11 - ((somar(0, 8) + somar(8, 11)) % 11);
  digitos = [digitoValidador1 >= 10 ? 0 : digitoValidador1, ...digitos];

  const digitoValidador2 = 11 - ((somar(0, 8) + somar(8, 12)) % 11);
  digitos = [digitoValidador2 >= 10 ? 0 : digitoValidador2, ...digitos];

  return digitos.reverse().toString().replaceAll(",", "");
}

console.log(gerarCNPJ());
console.log(gerarCPF());
