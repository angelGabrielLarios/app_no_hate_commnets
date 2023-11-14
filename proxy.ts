/**
 * La interfaz Subject declara operaciones comunes tanto para RealSubject como el
 * Proxy. Siempre y cuando el cliente trabaje con RealSubject utilizando esta
 * interfaz, podrás pasarle un proxy en lugar de un sujeto real.
 */
interface Subject {
    request(): void;
}

/**
 * RealSubject contiene lógica de negocio central. Normalmente, los RealSubjects son
 * capaces de realizar un trabajo útil que también puede ser muy lento o sensible,
 * por ejemplo, la corrección de datos de entrada. Un Proxy puede resolver estos
 * problemas sin necesidad de realizar cambios en el código de RealSubject.
 */
class RealSubject implements Subject {
    public request(): void {
        console.log('RealSubject: Manejando la solicitud.');
    }
}

/**
 * El Proxy tiene una interfaz idéntica a la de RealSubject.
 */
class ProxyT implements Subject {
    private realSubject: RealSubject;

    /**
     * El Proxy mantiene una referencia a un objeto de la clase RealSubject. Puede
     * cargarse de forma perezosa o pasarse al Proxy por el cliente.
     */
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }

    /**
     * Las aplicaciones más comunes del patrón Proxy son la carga perezosa,
     * el almacenamiento en caché, el control de acceso, el registro, etc. Un Proxy
     * puede realizar una de estas tareas y luego, según el resultado, pasar la
     * ejecución al mismo método en un objeto RealSubject vinculado.
     */
    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        // Deberían ir aquí algunas comprobaciones reales.
        console.log('Proxy: Comprobando el acceso antes de enviar una solicitud real.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Registrando la hora de la solicitud.');
    }
}

/**
 * Se supone que el código del cliente debe funcionar con todos los objetos (tanto sujetos como
 * proxies) a través de la interfaz Subject para admitir tanto sujetos reales como proxies.
 * Sin embargo, en la vida real, los clientes trabajan principalmente con sus sujetos reales
 * directamente. En este caso, para implementar el patrón más fácilmente, puedes extender
 * tu proxy desde la clase del sujeto real.
 */
function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
}

console.log('Cliente: Ejecutando el código del cliente con un sujeto real:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Cliente: Ejecutando el mismo código del cliente con un proxy:');
const proxy = new ProxyT(realSubject);
clientCode(proxy);
