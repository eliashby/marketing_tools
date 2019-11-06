import events from "./events";
import loaders from "./loaders";
import submits from "./submits";

export default {
	// events
	searchEvents: events.searchEvents,
	searchSingleEvent: events.searchSingleEvent,
	selectEvent: events.selectEvent,
	searchEventList: events.searchEventList,

	//loaders
	isTesting: loaders.isTesting,
	getRegionList: loaders.getRegionList,
	getSrcFile: loaders.getSrcFile,
	regInit: loaders.regInit,
	upgradeInit: loaders.upgradeInit,

	// submits
	submitOrder: submits.submitOrder,
	submitRegistration: submits.submitRegistration,
	updateRegistration: submits.updateRegistration,
	retrieveRegistration: submits.retrieveRegistration
};