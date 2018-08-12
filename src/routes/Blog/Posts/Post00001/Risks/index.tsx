import React from 'react'

const Risks = () => (
	<div className="Risks">
		<div className='title'>Risks</div>
		<div className="subtitle">Changing requirements</div>
		<div className='description' >
			Software and the way schools store data change constantly, as such the api’s
			and database design we use may become obsolete by the time of release.
			This is an intermediate issue that we have tried to solve through creating a the
			a stystem that is compatible with the new governments system.
		</div>
		<div className="subtitle">High expectations</div>
		<div className='description' >
			The project is quite large and incorporates skills that our group in not yet
			proficient, despite our careful planning, it often takes longer than anticipated
			to implement features. Therefore, the probability of us completing everything
			in our planning stage in quite unlikely. To avoid running the risk of bitting
			more we can chew, we categorised all the features by importance, so that
		</div>
		<div className="subtitle">Technical inability to properly implement security</div>
		<div className='description' >
			Currently non of our team members have any expertise in security therefore our
			system may be prone to hacking. This risk is of high priority as we will be dealing
			with sensitive data. To reduce the insecurities in our system, we have had to learn
			and use Oauth2, OpenID Connect and JWT while concurrently take security courses on Coursera.
		</div>
		<div className="subtitle">Team member may leave</div>
		<div className='description' >
			One of our core team members in under little obligation to contribute to the project.
			It is possible that this may result in a lack of work being done by the member.  medium
		</div>
	</div>
)
// what do you say
// so you can add what you want to add in the timeline
// go to routes/About/AboutCompany
// why do u want me to go to a route in about
export default Risks