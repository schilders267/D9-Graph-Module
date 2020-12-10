<?php

namespace Drupal\graph_module\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class GraphModuleAdminSettingsForm.
 */
class GraphModuleAdminSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'graph_module.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'graph_module_admin_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('graph_module.settings');
    $form['line_graph_color'] = [
      '#type' => 'color',
      '#title' => $this->t('Line Graph Color'),
      '#description' => $this->t('Line Graph Fill Color'),
      '#default_value' => $config->get('line_graph_color'),
    ];
    $form['bar_graph_color'] = [
      '#type' => 'color',
      '#title' => $this->t('Bar Graph Color'),
      '#description' => $this->t('Bar Graph Fill Color'),
      '#default_value' => $config->get('bar_graph_color'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('graph_module.settings')
      ->set('line_graph_color', $form_state->getValue('line_graph_color'))
      ->set('bar_graph_color', $form_state->getValue('bar_graph_color'))
      ->save();
  }

}
