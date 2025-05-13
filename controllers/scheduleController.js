const User = require('../models/User');
const Event = require('../models/Event');

// handles creating new events
exports.postEvent = async (req, res, next) => {
  try {
    if(!(req.body.title) || !(req.body.description)){
      const error = new Error('Fields not filled');
      error.statusCode = 404;
      throw error;
    }

    const event = new Event({
      userId: req.session.user.id,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.duedate
    });

    // Save event to database
    await event.save();

    // Redirect to login page with success message
    req.session.flashMessage = { 
      type: 'success', 
      text: 'New event successfully created.' 
    };
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
// handle retrieving all events
exports.getEvents = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const userEvents = await Event.find({ userId: userId });
    res.json(userEvents)
    res.status(200);
  } catch (error) {
    next(error);
  }
  
};