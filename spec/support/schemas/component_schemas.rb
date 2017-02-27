require_relative 'schema_helpers'

# Subsection serializer
BASE_COMPONENT_SERIALIZER = {
  type: OBJECT,
  required: [
              'id',
              'component_type',
              'title',
              'content_url',
              'position',
              'subsection_id'
            ],
  properties: {
    id: { type: INTEGER },
    component_type: { type: INTEGER },
    title: { type: STRING },
    form_key: { type: [STRING, NULL], default: EMPTY },
    audio_url: { type: [STRING, NULL], default: EMPTY },
    content_url: { type: STRING },
    position: { type: INTEGER },
    subsection_id: { type: INTEGER },
  }
}

# Component serializer
COMPONENT_ADMIN_SERIALIZER = BASE_COMPONENT_SERIALIZER
COMPONENT_LIST_SERIALIZER = BASE_COMPONENT_SERIALIZER

COMPONENT_STUDENT_SERIALIZER = {
  type: OBJECT,
  required: [
              'id',
              'component_type',
              'title',
              'content_url',
              'position',
              'subsection_id',
              'is_complete'
            ],
  properties: {
    id: { type: INTEGER },
    component_type: { type: INTEGER },
    title: { type: STRING },
    form_key: { type: [STRING, NULL], default: EMPTY },
    audio_url: { type: [STRING, NULL], default: EMPTY },
    content_url: { type: STRING },
    position: { type: INTEGER },
    subsection_id: { type: INTEGER },
    is_complete: { type: BOOLEAN },
  }
}
