<template>
  <div id="eventsDisplay">
    <div class="event-body">
          <div 
            class="event-box"
            v-for="event in events"
            :key="event.id"
          >

            <div class="event-details-wrap">
              <div class="date">
                <span>{{ event.day_of_week }}</span>
                <span>{{ event.standard_time }}</span>
                <span>{{ event.converted_time }}</span>
              </div>
              <div class="event-details">
                <h6>
                  <strong>{{ event.venue_name }}</strong>
                </h6>
                <p class="venue">{{ event.street_address1 }} {{ event.street_address2 }}</p>
                <p class="venue">{{ event.city }}, {{ event.state }} {{ event.zip }}</p>
                <p class="venue free-meal">{{ event.mealOrNo }}</p>
              </div>
              <div class="signup-btn">
                <div class="signup-image">
                  <img 
                    class="size-auto"
                    v-if="oliveGardenEvent(event.id)"
                    src="https://response-web.s3-us-west-2.amazonaws.com/images/Bus_Tour/olive-garden-min.png"
                    width="100"
                    height="82"
                  />
                  <img 
                    class="size-auto"
                    v-if="saltGrassEvent(event.id)"
                    src="https://response-web.s3-us-west-2.amazonaws.com/images/Bus_Tour/saltgrass-steakhouse-min.png"
                    width="112"
                    height="60"
                  />
                  <img 
                    class="size-auto"
                    v-if="outbackEvent(event.id)"
                    src="https://response-web.s3-us-west-2.amazonaws.com/images/Bus_Tour/outback-steakhouse-min.png"
                    width="112"
                    height="40"
                  />
                  <img 
                    class="size-auto"
                    v-if="habitsEvent(event.id)"
                    src="https://response-web.s3-us-west-2.amazonaws.com/images/Bus_Tour/habit-grill-min.png"
                    width="112"
                    height="80"
                  />
                </div>
                <button
                  @click.prevent="$emit('selectEvent', event )">
                  GET MY TICKETS!</button>
              </div>
            </div>

        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "Events",
  props: ["eventsList"],
  data() {
    return {
      og: [
        '30E91CBD-1A91-E911-80F1-000D3A322222',
        'F62FD961-55AE-E911-80F6-000D3A32101C',
        'F22FD961-55AE-E911-80F6-000D3A32101C',
        '865FB22B-DFB3-E911-80F6-000D3A32101C',
        'DDDAB0BC-DEB3-E911-80F3-000D3A322222',
        '28427A32-DFB3-E911-80F6-000D3A32101C',
        'DEDAB0BC-DEB3-E911-80F3-000D3A322222',
        'CCDB63BB-DEB3-E911-80F6-000D3A32101C',
        'E3DAB0BC-DEB3-E911-80F3-000D3A322222',
        'D2DB63BB-DEB3-E911-80F6-000D3A32101C',
        '5911C4AB-ABB4-E911-80F6-000D3A32101C',
        '6A11C4AB-ABB4-E911-80F6-000D3A32101C'
      ],
      outback: [
        '689D9524-9493-E911-80F1-000D3A322222',
        'D762AAC3-1A91-E911-80F1-000D3A322222'
      ],
      saltGrass: [
        'D362AAC3-1A91-E911-80F1-000D3A322222'
      ],
      habits: [
        '6F11C4AB-ABB4-E911-80F6-000D3A32101C'
      ]
    }
  },
  computed: {
    events() {
      const updateEvents = this.eventsList;
      for (let i = 0; i < updateEvents.length; i++) {
        updateEvents[i].mealOrNo = updateEvents[i].meal_type !== 'none' ? updateEvents[i].meal_type.toUpperCase() + ' EVENT' : '';
      }
      return updateEvents;
    }
  },
  methods: {
    oliveGardenEvent(eid) {
      if (this.og.includes(eid)) {
        return true;
      }
      return false;
    },
    outbackEvent(eid) {
      if (this.outback.includes(eid)) {
        return true;
      }
      return false;
    },
    saltGrassEvent(eid) {
      if (this.saltGrass.includes(eid)) {
        return true;
      }
      return false;
    },
    habitsEvent(eid) {
      if (this.habits.includes(eid)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>

#eventsDisplay {
  margin-top: 20px;
}

.free-meal {
  color: #0598f8;
  font-weight: bold;
}

.date {
  width: 100%;
  max-width: 20%;
}

.event-details {
  width: 100%;
  padding-left: 5%;
  max-width: 40%;
}

.signup-btn {
  width: 100%;
  text-align: right;
  max-width: 40%;
  text-align: center;
}

.event-box {
  padding: 15px;
  background: #f2f2f2;
  margin-bottom: 15px;
}

.signup-btn button {
  display: inline-block;
  border: none;
  background: #0598f8;
  color: #fff;
  padding: 8px 40px;
}

.signup-btn button:hover {
  background: #0188e0;
  cursor: pointer;
}

.weekday {
  margin-bottom: 20px;
}

.venue {
  margin: 0;
}

.signup-btn span {
  display: block;
  font-style: italic;
  font-size: 0.8em;
}

.active-event-display .event-body {
  display: block;
}

.event-city {
  margin-bottom: 15px;
  position: relative;
}

.date span {
  display: block;
  text-align: center;
}

.icon-chevron-down {
  max-width: 36px;
  float: right;
  margin-top: 5px;
}

.event-details-wrap {
  -moz-display: flex;
  -webkit-display: flex;
  display: flex;
  align-items: center;
}

.signup-image img {
  margin-bottom: 15px;
}

@media (max-width: 767px) {
  .date {
    width: 100%;
    margin-bottom: 20px;
    max-width: 100%;
  }

  .event-details {
    width: 100%;
    float: none;
    padding-left: 0;
    text-align: center;
    margin-bottom: 20px;
    max-width: 100%;
  }

  .event-details-wrap {
    display: block;
  }

  .icon-chevron-down {
    max-width: 20px;
  }

  .city-btn {
    font-size: 18px;
  }

  .event-box,
  .event-details h6 {
    font-size: 16px;
  }

  .icon-chevron-down {
    top: 15px;
  }

  .signup-btn {
    max-width: 100%;
  }
}

</style>
