import React, { useEffect, useState } from 'react';
import { getCuentasByUsuario } from '../cuentas/cuentas'; // Reemplaza 'tu-api' con el nombre del archivo de tu API

const Cuentas = () => {
  const [cuentas, setCuentas] = useState([]);
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const usuarioId = payload ? payload.uid : null;

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        if (usuarioId) {
          // Realizar la solicitud para obtener las cuentas vinculadas al usuario
          const cuentas = await getCuentasByUsuario(usuarioId);

          // Actualizar el estado con las cuentas obtenidas
          setCuentas(cuentas);
        }
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
      }
    };

    fetchCuentas();
  }, [usuarioId]);

  return (
    <div className='container mt-4'>
      <h1>Cuenta Personal</h1>
      <hr />
      <table className="table">
        <thead>
          <tr>
          
            <th>No. Cuenta</th>
            <th>Tipo de Cuenta</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {cuentas.map((cuenta, index) => (
            <tr key={cuenta._id}>
              <td>{cuenta.noCuenta}</td>
              <td>{cuenta.tipoCuenta}</td>
              <td>{cuenta.saldo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cuentas;
