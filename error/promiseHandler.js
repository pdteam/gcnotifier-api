function handle(promise, timeout) {

  //Establish a timeout period  
  let timer = process.env.TIMEOUT || 30000;

  return Promise.race([
    //return the promise we are after
    promise
      .then(data => ({ success: data, failure: undefined }))
      .catch(error => Promise.resolve({ success: undefined, failure: error })),
    //Return a failue if the timeout is reached
    new Promise((_res, _rej) => timer = setTimeout(_res, timeout, { success: undefined, failure: 'Timeout Error' }))
  ]).finally(() => clearTimeout(timer));

}

module.exports = handle;