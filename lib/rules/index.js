require('colors')
const Engine = require('json-rules-engine').Engine

async function run(email) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>');
  try {
    /**
     * Setup a new engine
     */
    const engine = new Engine()

    // define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
    // (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
    engine.addRule({
      conditions: {
        any: [{
          all: [{
            fact: 'gameDuration',
            operator: 'equal',
            value: 40
          }, {
            fact: 'personalFoulCount',
            operator: 'greaterThanInclusive',
            value: 5
          }]
        }, {
          all: [{
            fact: 'gameDuration',
            operator: 'equal',
            value: 48
          }, {
            fact: 'personalFoulCount',
            operator: 'greaterThanInclusive',
            value: 6
          }]
        }]
      },
      event: { // define the event to fire when the conditions evaluate truthy
        type: 'fouledOut',
        params: {
          message: 'Player has fouled out!'
        }
      }
    })

    /**
     * define the facts
     * note: facts may be loaded asynchronously at runtime; see the advanced example below
     */
    const facts = {
      personalFoulCount: 6,
      gameDuration: 40
    }

    // run the engine
    const results = await engine.run(facts);
    console.log('>>>>>>>>>>>>>>>>>>>>>>');
    console.log(results);
    console.log('<<<<<<<<<<<<<<<<<<<<<<');
    return results.events.map(event => console.log(event.params.message.red))
  } catch (err) {
    console.log(err);
  }

}

module.exports = { run };
/*
 * OUTPUT:
 *
 * Player has fouled out!
 */
