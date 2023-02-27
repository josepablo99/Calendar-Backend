const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { actualizarEvento, crearEvento, eliminarEvento, getEventos } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.use(validarJWT);

// Todas tienen que pasar la validacion del JWT
// Obtener eventos

router.get('/', getEventos);

// Crear un nuevo evento

router.post('/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
  ],
  crearEvento);

// Actualizar evento

router.put('/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
  ],
  actualizarEvento);

// Borrar evento

router.delete('/:id', eliminarEvento);

module.exports = router;
