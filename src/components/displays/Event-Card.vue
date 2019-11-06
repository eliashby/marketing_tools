<template>
  <div id="eventsDisplay">
    <div
      class="event-box"
      v-for="event in events"
      :key="event.id"
      @click.prevent="$emit('selectEvent', event )"
    >
      <div class="date">
        <h6 class="weekday">{{ event.day_of_week.split("").slice(0, 3).join("") }}</h6>
        <p class="month">{{ event.month.split("").slice(0, 3).join("") }} {{ event.day_of_month }}</p>
      </div>
      <div class="label">
        <h6>
          <span class="city">{{ event.city }} - {{ event.mealOrNo }}</span>
        </h6>
        <p class="venue">{{ event.eventLabel }}</p>
      </div>
      <v-icon class="icon" name="chevron-right"></v-icon>
    </div>
  </div>
</template>

<script>

export default {
  name: "Events",
  props: ["eventsList"],
  computed: {
    events() {
      const updateEvents = this.eventsList;
      for (let i = 0; i < updateEvents.length; i++) {
        const eventLabel = updateEvents[i].converted_time + " - " + updateEvents[i].venue_name;
        updateEvents[i].eventLabel = eventLabel.length > 25 ? eventLabel.slice(0, 22) + "..." : eventLabel;

        updateEvents[i].mealOrNo = updateEvents[i].meal_type !== 'none' ? updateEvents[i].meal_type.charAt(0).toUpperCase() + updateEvents[i].meal_type.slice(1) : updateEvents[i].state;

      }
      return updateEvents;
    }
  }
};
</script>

<style scoped>
.event-box {
  background-color: #ea4d4d;
  color: #fff;
  border: 1px solid;
  cursor: pointer;
  display: flex;
  height: 75px;
  flex-direction: row;
  margin: 5px 0;
  padding: 10px;
}

.date,
.label {
  display: flex;
  flex-direction: column;
}

.date {
  align-items: center;
  border-right: 1px solid;
  justify-content: center;
  margin-right: 10px;
  width: 60px;
}

.weekday,
.month,
.label h6 {
  margin-bottom: 0;
}

.label {
  color: inherit;
  flex-grow: 1;
  justify-content: center;
  text-align: left;
}

.venue {
  font-size: 12px;
  margin-bottom: 0;
}

.icon {
  width: 30px;
}
</style>
