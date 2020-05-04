const axios = require('axios');
const httpClient = axios.create();
httpClient.defaults.timeout = 500;

function getAssessmentForm(req, res) {
  res.render('index', { signedIn: true })
}
function sendAssessment(req, res) {

  const campaign_id = getCampaignId(req.body.assessment);
  const psychometric_campaign_id = process.env.PSYCHOMETRIC_CAMPAIGN_ID
  const base_url = 'https://www.codingame.com/assessment/api'
  const options = {
	   candidate_name: req.body.candidate_name,
	   candidate_email: req.body.candidate_email,
	   recruiter_email: req.body.recruiter_email,
     send_invitation_email: "true"
  }
  const config = {
    headers: {
      'API-Key': process.env.API_KEY,
      'Content-Type': 'application/json'
    }
  }
  // -------SEND FIRST TEST -> ANY
  httpClient.post(`${base_url}/v1.1/campaigns/${campaign_id}/actions/send`, options, config)
  .then(function (response) {

    // -------SEND PSYCHOMETRIC ASSESSMENT IF NEEDED -> ANY
    if (req.body.send_psychometrics === "on") {
      httpClient.post(`${base_url}/v1.1/campaigns/${psychometric_campaign_id}/actions/send`, options, config)
      .then(function (response) {
        let options = {
          candidate: {
            type: convertAssessmentType(req.body.assessment),
            combined: true,
            name: JSON.parse(response.config.data).candidate_name,
            email: JSON.parse(response.config.data).candidate_email
          },
          alert: null,
          error: null,
          signedIn: true,
        }
        res.render('success', options)
      })

      //---------THROW ERROR IF FAIL FOR SECOND ASSESSMENT
      .catch(function (error) {
        let message;
        if (error.response.status) {
           message = `Error: Request failed with a status code ${error.response.status} - ${error.response.statusText}`
        }
        let options = {
          alert: null,
          message: message,
          signedIn: true
        }
        res.render('fail', options)


      });

    //----------SUCCESS FOR ONE ASSESSMENT ----
    } else {
      let options = {
        candidate: {
          type: convertAssessmentType(req.body.assessment),
          combined: false,
          name: JSON.parse(response.config.data).candidate_name,
          email: JSON.parse(response.config.data).candidate_email
        },
        alert: null,
        error: null,
        signedIn: true,
      }
      res.render('success', options)
    }

  // -------THROW ERROR FOR FIRST ASSESSMENT
  })
  .catch(function (error) {
    let message;
    if (error.response.status) {
       message = `Error: Request failed with a status code ${error.response.status} - ${error.response.statusText}`
    }

    let options = {
      alert: null,
      message: message,
      signedIn: true
    }
    res.render('fail', options)
  });
}

function convertAssessmentType(type){
  let assessment_type;
  if (type === 'learning') {
    assessment_type = 'Python Learning Path Assessment';
  } else if (type === 'python') {
    assessment_type = 'Python Assessment';
  } else if (type === 'java') {
    assessment_type = 'Java Assessment';
  } else if (type === 'csharp') {
    assessment_type = 'C# Assessment';
  } else if (type === 'psychometric') {
    assessment_type = 'Psychometric Assessment';
  }
  return assessment_type;
}

function success(req, res) {

  // if(req.query.name && req.query.email && req.query.email){
  //
  //
  //   const candidate = {
  //     name: req.query.name,
  //     email: req.query.email,
  //     combined: req.query.combined,
  //     type: assessment_type
  //   }
  //
  //   let options = {
  //     alert: null,
  //     error: null,
  //     signedIn: true,
  //     candidate: candidate
  //   }
  //   res.render('success', options)
  // } else {
  //   res.redirect('/')
  // }
}

function fail(req, res) {

  if(req.query.error){
    let options = {
      alert: null,
      message: req.query.error,
      signedIn: true
    }
    res.render('fail', options)
  } else {
    res.redirect('/')
  }

}

function getCampaignId(assessment) {
  let id = null;
  if (assessment === 'learning') {
    id = process.env.PYTHON_PATH_ID
  } else if (assessment === 'python') {
    id = process.env.PYTHON_ASSESSMENT_ID
  } else if (assessment === 'java') {
    id = process.env.JAVA_ASSESSMENT_ID
  } else if (assessment === 'csharp') {
    id = process.env.CSHARP_ASSESSMENT_ID
  } else if (assessment === 'psychometric') {
    id = process.env.PSYCHOMETRIC_CAMPAIGN_ID
  }
  return id
}

module.exports = {
  getAssessmentForm: getAssessmentForm,
  sendAssessment: sendAssessment,
  success: success,
  fail: fail
}
