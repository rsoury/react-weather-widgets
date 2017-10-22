import country from './country';
import weather from './weather';
import misc from './misc';

export default function(app){
	weather(app);
	country(app);
	misc(app);
}