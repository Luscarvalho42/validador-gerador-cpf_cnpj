export default function validar(cpfCnpj) {
  cpfCnpj = cpfCnpj.replace(/\D/g, "");

  if (cpfCnpj.length < 11 || cpfCnpj.length > 14) {
    definirInvalido();
  } else if (cpfCnpj.length === 11) {
    validarCPF(cpfCnpj) ? definirValido() : definirInvalido();
  } else {
    validarCNPJ(cpfCnpj) ? definirValido() : definirInvalido();
  }
}

function validarCPF(cpf) {
  const cnpjsInvalidos = [];
  for (let i = 0; i <= 9; i++) {
    const cpfInvalido = String(i).repeat(11);
    cnpjsInvalidos.push(cpfInvalido);
  }

  if (cnpjsInvalidos.includes(cpf)) return false;

  const somar = (peso) =>
    [...cpf]
      .splice(0, peso - 1)
      .reduce((soma, digito, index) => soma + digito * (peso - index), 0);

  const digitoValidador1 = 11 - (somar(10) % 11);
  if ((digitoValidador1 >= 10 ? 0 : digitoValidador1) != cpf[9]) return false;
  const digitoValidador2 = 11 - (somar(11) % 11);
  if ((digitoValidador2 >= 10 ? 0 : digitoValidador2) != cpf[10]) return false;

  return true;
}

function validarCNPJ(cnpj) {
  const cnpjsInvalidos = [];
  for (let i = 0; i <= 9; i++) {
    const cnpjInvalido = String(i).repeat(14);
    cnpjsInvalidos.push(cnpjInvalido);
  }

  if (cnpjsInvalidos.includes(cnpj)) return false;

  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const digitoValidador1 = 11 - (soma % 11);
  if ((digitoValidador1 >= 10 ? 0 : digitoValidador1) != cnpj[12]) {
    return false;
  }

  soma = 0;
  peso = 2;
  for (var j = 12; j >= 0; j--) {
    soma += parseInt(cnpj.charAt(j)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const digitoValidador2 = 11 - (soma % 11);
  if ((digitoValidador2 >= 10 ? 0 : digitoValidador2) != cnpj[13]) {
    return false;
  }

  return true;
}

function definirValido() {
  const divInputContainer = document.getElementById("input-container");
  divInputContainer.classList.add("valido");
  divInputContainer.classList.remove("invalido");
}

function definirInvalido() {
  const divInputContainer = document.getElementById("input-container");
  divInputContainer.classList.add("invalido");
  divInputContainer.classList.remove("valido");
}
