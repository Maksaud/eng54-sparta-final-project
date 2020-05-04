$(function() {
  const checkbox = $('#checkbox');
  const checkbox_container = $('#checkbox_container');
  const dropdown = $('#assessment');
  const submit = $('#submit');
  const candidate_name = $('#candidate_name');
  const candidate_email = $('#candidate_email');
  const recruiter_email = $('#recruiter_email');
  const form_fields = $('.form_fields');
  const assessment_form = $('#assessment_form');

  assessment_form.on('submit', function(){
    submit.prop('disabled', true);
  })

  form_fields.on('change', function(){
    if(candidate_name.val().length > 0 && candidate_email.val().length > 0 && recruiter_email.val().length > 0 ) {
      submit.prop('disabled', false);
    }
  })

  dropdown.on('change', function(){
    if(dropdown.val() !== "psychometric"){
      checkbox_container.show();
    } else {
      checkbox.prop('checked', false);
      checkbox_container.hide();
    }
  })
});
