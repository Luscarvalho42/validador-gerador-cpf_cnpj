import gerarAleatorio from "./gerarAleatorio.js";
import validar from "./validar.js";

function aplicarMascara(cpfCnpj) {
  cpfCnpj = cpfCnpj.replace(/\D/g, "");

  if (!document.getElementById("aplicar-mascara").checked) return cpfCnpj;

  if (cpfCnpj.length === 11) {
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cpfCnpj.length === 14) {
    cpfCnpj = cpfCnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return cpfCnpj;
}

const inputCpfCnpj = document.getElementById("cpf-cnpj");
const switchGerarCPF = document.getElementById("gerar-cpf");
const switchGerarCNPJ = document.getElementById("gerar-cnpj");

inputCpfCnpj.value = aplicarMascara(gerarAleatorio());
validar(inputCpfCnpj.value);

document.getElementById("gerar").onclick = () => {
  inputCpfCnpj.value = aplicarMascara(gerarAleatorio());
  validar(inputCpfCnpj.value);
};

document.getElementById("copiar").onclick = () =>
  navigator.clipboard.writeText(inputCpfCnpj.value);

document.getElementById("aplicar-mascara").onchange = () =>
  (inputCpfCnpj.value = aplicarMascara(inputCpfCnpj.value));

inputCpfCnpj.oninput = () => {
  validar(inputCpfCnpj.value);
  inputCpfCnpj.value = aplicarMascara(inputCpfCnpj.value);
};

switchGerarCPF.onchange = () =>
  switchGerarCPF.checked
    ? (switchGerarCPF.checked = true)
    : (switchGerarCNPJ.checked = true);

switchGerarCNPJ.onchange = () =>
  switchGerarCNPJ.checked
    ? (switchGerarCNPJ.checked = true)
    : (switchGerarCPF.checked = true);
