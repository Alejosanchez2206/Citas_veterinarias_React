import { useState, useEffect } from "react"
import Error from "./Error"
export default function Formulario({ setPacientes, pacientes, paciente }) {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [alta, setAlta] = useState('')
    const [sintomas, setSintomas] = useState('')

    const [error, setError] = useState(false)

    useEffect(() => {
        if( Object.keys(paciente).length > 0 ){
            let { nombre , propietario , email , alta , sintomas } = paciente
            setNombre(nombre)
            setPropietario(propietario)
            setEmail(email)
            setAlta(alta)
            setSintomas(sintomas)
        }
    }, [paciente])

    const generateId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)
        return fecha + random
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validaciones del formulario
        if ([nombre, propietario, email, alta, sintomas].includes('')) {
            setError(true)
            return;
        }

        setError(false)

        // Objectos paciente

        const ObjectoPacientes = {            
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }

        if(paciente.id){
            //Editar el registro
            ObjectoPacientes.id = paciente.id
            const pacientesActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? ObjectoPacientes : pacienteState)
            setPacientes(pacientesActualizado)
            setPaciente({})

        }else{

            //Nuevo registro
            ObjectoPacientes.id = generateId(),
            setPacientes([...pacientes, ObjectoPacientes])
        }

       

        // Reiniciar formulario
        setNombre('')
        setEmail('')
        setSintomas('')
        setAlta('')
        setPropietario('')


    }
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-5">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold  ">Administralos</span>
            </p>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
                {error && (
                    <Error
                        mensaje='Todos los campos son obligatorios'
                    />
                )}
                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold">
                        Nombre del Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold">
                        Email contacto Propietario
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={alta}
                        onChange={(e) => setAlta(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        placeholder="Ingrese los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
                    value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
                />
            </form>
        </div>
    )
}
