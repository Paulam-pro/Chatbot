const input = document.getElementById("mensaje");
const chat = document.getElementById("subtitulo");
const boton = document.getElementById("boton-enviar");

boton.addEventListener("click", enviarMensaje);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        enviarMensaje();
    }
});

async function enviarMensaje() {
    const texto = input.value.trim();
    if (!texto) return;

    const bienvenida = document.getElementById("mensaje-bienvenida");
    if (bienvenida) {
        bienvenida.remove();
    }
    agregarMensaje(texto, "usuario");
    input.value = "";

    agregarMensaje("Escribiendo...", "bot");
    const respuesta = await obtenerRespuesta(texto);
    actualizarUltimoMensaje(respuesta);
}

function agregarMensaje(texto, clase) {
    const div = document.createElement("div");
    div.className = `chat ${clase}`;
    div.textContent = texto; 
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    }

function actualizarUltimoMensaje(texto) {
    const mensajes = chat.querySelectorAll(".chat.bot");
    if (mensajes.length > 0){
        mensajes[mensajes.length - 1].textContent = texto;
    }
}

async function obtenerRespuesta(mensaje) {
    try {
        const res = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pregunta: mensaje })
        });
        const data = await res.json();
        return data.respuesta;
    } catch {
        return "Hubo un error al conectarse con el chatbot.";
    }
};


