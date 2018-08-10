import React from 'react'
import PostTemplate from './postTemplate'

const ONE = () => (
	<PostTemplate
		content={{
			'This is the title': 'title',
			'24 February 2018': 'date',
			'Charl kruger': 'author',
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam rem nobis quam autem odit, rerum, cupiditate repellendus deleniti beatae, sequi animi ut debitis <br>amet? Vero inventore obcaecati culpa nobis maiores?': 'paragraph',
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam rem nobis quam autem odit, rerum, cupiditate repellendus deleniti beatae, sequi animi ut debitis amet? Vero inventore obcaecati culpa nobis maioresds?': 'paragraph'
		}}
	/>
)

export default ONE


