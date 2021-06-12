const index = (req, res) => {
  res.render('index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
  res.status(200).json({
    message: 'Hola Bienvenido a Fullstack Web',
  });
};

export default {
  index,
  greeting,
};


