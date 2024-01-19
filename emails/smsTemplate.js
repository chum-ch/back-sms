/* eslint-disable no-unused-expressions */
module.exports.smsTemplate = function smsTemplate(fullName, subject, link) {
  return `
<html>
  <head> 
    <style>
      * {
        padding: 0;
        margin: 0;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      }
      section {
        border: 5px solid #068bbf;
        border-width: 5px 2px 5px 2px;
        border-radius: 10px;
        width: 95%;
        margin: 0 auto;
        text-align: justify;
      }
      .container {
        min-height: 60vh;
      }
      .header {
        border-bottom: 1px solid #068bbf;
        padding: 5px;
      }
      img {
        display: block;
        margin: auto 5px auto auto;
      }
      .main {
        padding: 10px;
      }
      footer {
        border-top: 5px solid #068bbf;
        background: #82cae6;
        padding: 1.5rem 0;
        border-radius: 0 0 5px 5px;
        color: #01709c;
        text-align: center;
      }
      h1 {
        text-align: center;
        color: #01709c;
        margin: 10px 0;
      }
      .thanks, .sms-team {
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <section>
      <div class="container">
        <div class="header">
          <img
            src="https://chum-ch.github.io/front-sms/assets/school-1-fd6006aa.png"
            width="65"
            alt=""
          />
        </div>
        <div class="main">
          <h1>${subject}</h1>
          <p>
            Dear, ${fullName} <br><br>
            Your organization have invited you to <span> ${subject}</span>, so click <a href="${link}">here</a> to see details.
          </p>
        </div>
        
      </div>
      <div class="thanks">
        <p>Thanks have a good luck,</p>
        <p class="sms-team">SMS Team</p>
      </div>
      <footer><p>CN &copy; ${new Date().getFullYear()} School management system.</p></footer>
    </section>
  </body>
</html>
`;
};
