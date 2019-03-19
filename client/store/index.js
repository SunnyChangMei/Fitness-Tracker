import { createStore } from 'redux'

export const initialState = {
  workouts: [
    {
      id: 1,
      name: 'Tuesday Routine',
      exercises: [
        {
          id: 1,
          name: 'Bicycling',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum est volutpat ultricies consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          duration: 30,
          completed: false,
        },
        {
          id: 2,
          name: 'Running',
          description:
            'Praesent at ex sed diam pellentesque congue pellentesque eu felis. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel orci laoreet, commodo quam in, dignissim purus. Nunc a lacinia eros, sed lobortis ipsum.',
          duration: 45,
          completed: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Saturday Routine',
      exercises: [
        {
          id: 3,
          name: 'Swimming',
          description:
            'Vivamus eu consequat ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet mattis augue, eget interdum diam.',
          duration: 30,
          completed: true,
        },
        {
          id: 4,
          name: 'Running',
          description:
            'Cras vestibulum, libero vel convallis molestie, magna tortor tempor lacus, eu aliquet erat magna a lacus. Vestibulum mauris nibh, ultrices in tortor a, eleifend placerat mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dapibus sed felis pharetra luctus.',
          duration: 20,
          completed: true,
        },
      ],
    },
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export const store = createStore(reducer)
