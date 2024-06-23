import "./style.css";

interface Reserva {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

const reservas: Reserva[] = [
  {
      tipoHabitacion: "standard",
      desayuno: false,
      pax: 1,
      noches: 3,
  },
  {
      tipoHabitacion: "standard",
      desayuno: false,
      pax: 1,
      noches: 4,
  },
  {
      tipoHabitacion: "suite",
      desayuno: true,
      pax: 2,
      noches: 1,
  },
];

class CalculadoraReservas {
  protected reservas: Reserva[];
  protected descuento: number;

  constructor(reservas: Reserva[], descuento: number = 0) {
      this.reservas = reservas;
      this.descuento = descuento;
  }

  protected obtenerPrecioBase(tipoHabitacion: "standard" | "suite"): number {
      if (tipoHabitacion === "standard") {
          return 100;
      } else {
          return 150;
      }
  }

  get subtotal(): number {
      let total = 0;
      for (const reserva of this.reservas) {
          const precioBase = this.obtenerPrecioBase(reserva.tipoHabitacion);
          const costoAdicionalPax = (reserva.pax - 1) * 40;
          let costoDesayuno = 0;

          if (reserva.desayuno) {
              costoDesayuno = 15 * reserva.pax * reserva.noches;
          } else {
              costoDesayuno = 0;
          }

          total += (precioBase + costoAdicionalPax + costoDesayuno) * reserva.noches;
      }
      return total;
  }

  get total(): number {
      const subtotalConDescuento = this.subtotal * (1 - this.descuento);
      return subtotalConDescuento * 1.21;
  }
}

class CalculadoraReservasParticular extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
      super(reservas);
  }
}

class CalculadoraReservasTourOperador extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
      super(reservas, 0.15); 
  }

  protected obtenerPrecioBase(): number {
      return 100; 
  }
}


const calculadoraParticular = new CalculadoraReservasParticular(reservas);
const calculadoraTourOperador = new CalculadoraReservasTourOperador(reservas);

const subtotalParticularNode = document.getElementById('subtotalParticular');
const totalParticularNode = document.getElementById('totalParticular');
const subtotalTourOperadorNode = document.getElementById('subtotalTourOperador');
const totalTourOperadorNode = document.getElementById('totalTourOperador');

if (subtotalParticularNode) {
  subtotalParticularNode.textContent = `Subtotal: ${calculadoraParticular.subtotal.toFixed(2)} €`;
} else {
  console.error('El nodo subtotalParticular no existe en el documento.');
}

if (totalParticularNode) {
  totalParticularNode.textContent = `Total: ${calculadoraParticular.total.toFixed(2)} €`;
} else {
  console.error('El nodo totalParticular no existe en el documento.');
}

if (subtotalTourOperadorNode) {
  subtotalTourOperadorNode.textContent = `Subtotal: ${calculadoraTourOperador.subtotal.toFixed(2)} €`;
} else {
  console.error('El nodo subtotalTourOperador no existe en el documento.');
}

if (totalTourOperadorNode) {
  totalTourOperadorNode.textContent = `Total: ${calculadoraTourOperador.total.toFixed(2)} €`;
} else {
  console.error('El nodo totalTourOperador no existe en el documento.');
}
