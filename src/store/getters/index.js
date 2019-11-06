export default {
  address: state => state.event_options.filters.nearby.address,
  eventsList: state => state.eventsList,
  eventOptions: state => state.event_options,
  filteredEvents: state => state.filteredEvents,
  isGuestAttending: state => state.registration.tags.attending_with_guest,
  marketGroup: state => state.event_options.filters.market_groups,
  priceListId: state => state.order_options.price_list_id,
  privacyPolicy: state => state.links_meta_data.disclaimers.privacy,
  productList: state => state.product_list,
  selectedEvent: state => state.registration.selected_event,
  selectedProduct: state => state.order_options.products,
  testing: state => state.testing,
  termsAndConditions: state => state.links_meta_data.disclaimers.terms,
  tags: state => state.tags,
};

