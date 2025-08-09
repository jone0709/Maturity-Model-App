export type Question = {
  id: number;
  domain: string;
  text: string;
  target: number;
};

export const QUESTIONS: Question[] = [
  // AI Governance, Risk & Compliance
  { id: 0, domain: "AI Governance, Risk & Compliance", text: "Do you have an AI governance charter with roles/RACI and intake risk-tiering aligned to EU AI Act categories?", target: 2 },
  { id: 1, domain: "AI Governance, Risk & Compliance", text: "Do you run DPIAs for applicable use cases and store approvals with audit trails?", target: 3 },
  { id: 2, domain: "AI Governance, Risk & Compliance", text: "Do you generate model cards and datasheets for datasets as part of release?", target: 3 },
  { id: 3, domain: "AI Governance, Risk & Compliance", text: "Do you automate compliance checks (policy-as-code) tied to CI/CD releases?", target: 3 },
  { id: 4, domain: "AI Governance, Risk & Compliance", text: "Do you track governance effectiveness metrics and corrective actions?", target: 4 },
  { id: 5, domain: "AI Governance, Risk & Compliance", text: "Do you enforce mandatory controls via policy-as-code (e.g., signing, provenance, eval gates)?", target: 5 },
  { id: 6, domain: "AI Governance, Risk & Compliance", text: "Do you obtain external attestations/audits for high-risk AI systems?", target: 4 },

  // Secure AI Development / MLSecOps & supply chain
  { id: 7, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you have secure AI SDLC guidelines/training and protected branches/code owners?", target: 2 },
  { id: 8, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do SAST and secrets scanning run on every PR and block merges by severity policy?", target: 3 },
  { id: 9, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you scan IaC (Terraform/Kubernetes) and container images in CI with enforced gates?", target: 3 },
  { id: 10, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you generate and verify SBOM/MLBOM for models/containers before release?", target: 3 },
  { id: 11, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you produce and verify intoto/SLSA provenance from dataâ†’featuresâ†’trainingâ†’modelâ†’serving?", target: 3 },
  { id: 12, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you ban unsafe deserialization/loaders (e.g., pickle) with enforced code scanning rules?", target: 2 },
  { id: 13, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you enforce a model registry that denies unsigned/unauthorized artifacts at deploy?", target: 3 },
  { id: 14, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do you support autorollback to last-known-good on failed security/safety checks?", target: 4 },
  { id: 15, domain: "Secure AI Development / MLSecOps & Supply Chain", text: "Do policy-as-code gates enforce signatures, attestations, SBOM/MLBOM, and scan passes with timebound exceptions?", target: 5 },

  // AI Data Security & Privacy
  { id: 16, domain: "AI Data Security & Privacy", text: "Do you classify AI data (prompts, embeddings, retrievals) and enforce DLP on these flows?", target: 2 },
  { id: 17, domain: "AI Data Security & Privacy", text: "Do you secure AI data pipelines and storage with encryption at rest/in transit and secrets management?", target: 2 },
  { id: 18, domain: "AI Data Security & Privacy", text: "Do you implement privacy-by-design and DPIAs for AI use cases?", target: 3 },
  { id: 19, domain: "AI Data Security & Privacy", text: "Do you use PETs where appropriate (e.g., DP with $$\\epsilon$$, FL, SMPC) and record utility tradeoffs?", target: 3 },
  { id: 20, domain: "AI Data Security & Privacy", text: "Do you perform membership-inference or inversion testing pre-release?", target: 4 },
  { id: 21, domain: "AI Data Security & Privacy", text: "Do you enforce context-aware access controls and data minimization/retention policies for AI data?", target: 4 },
  { id: 22, domain: "AI Data Security & Privacy", text: "Do you autonomously quarantine suspect data or rotate indices on privacy/poisoning risk signals?", target: 5 },

  // AI Infrastructure Security
  { id: 23, domain: "AI Infrastructure Security", text: "Do you enforce namespace/network segmentation and egress controls for AI workloads?", target: 2 },
  { id: 24, domain: "AI Infrastructure Security", text: "Do you isolate GPU pools (e.g., node taints/MIG) and enforce VRAM hygiene?", target: 3 },
  { id: 25, domain: "AI Infrastructure Security", text: "Do you pin drivers/CUDA and use signed base images for training/inference nodes?", target: 3 },
  { id: 26, domain: "AI Infrastructure Security", text: "Do you use confidential computing/attestation for applicable AI workloads (or documented exceptions)?", target: 3 },
  { id: 27, domain: "AI Infrastructure Security", text: "Do you automate secure environment provisioning and detect configuration drift?", target: 3 },
  { id: 28, domain: "AI Infrastructure Security", text: "Do you monitor infra security effectiveness and GPU/accelerator telemetry for anomalies?", target: 4 },
  { id: 29, domain: "AI Infrastructure Security", text: "Do you have predictive infra threat detection and governed autoremediation with approvals/rollback?", target: 5 },

  // LLM / LLMOps & RAG Application Security
  { id: 30, domain: "LLM / LLMOps & RAG Application Security", text: "Do you use secure prompt templates and input/output policy filters with documented blocked examples?", target: 2 },
  { id: 31, domain: "LLM / LLMOps & RAG Application Security", text: "Do you enforce rate limiting and basic DoS protection for LLM endpoints?", target: 2 },
  { id: 32, domain: "LLM / LLMOps & RAG Application Security", text: "Do you enforce tool/function allowlists, sandboxing, and circuit breakers with approval workflows for sensitive actions?", target: 3 },
  { id: 33, domain: "LLM / LLMOps & RAG Application Security", text: "Do you isolate vector stores per tenant/namespace and sign ingestion pipelines?", target: 3 },
  { id: 34, domain: "LLM / LLMOps & RAG Application Security", text: "Do you run retrieval moderation and grounding checks with pass thresholds?", target: 3 },
  { id: 35, domain: "LLM / LLMOps & RAG Application Security", text: "Do you run continuous jailbreak/prompt injection tests in CI with release thresholds?", target: 3 },
  { id: 36, domain: "LLM / LLMOps & RAG Application Security", text: "Do you define and monitor behavior SLOs (e.g., groundedness, refusal correctness, toxicity)?", target: 4 },
  { id: 37, domain: "LLM / LLMOps & RAG Application Security", text: "Do you apply adaptive guardrails and dynamic tool permission narrowing under attack conditions?", target: 5 },

  // AI Model Security
  { id: 38, domain: "AI Model Security", text: "Do you secure model storage with encryption and least-privilege access controls?", target: 2 },
  { id: 39, domain: "AI Model Security", text: "Do you version models in a registry with integrity validation?", target: 2 },
  { id: 40, domain: "AI Model Security", text: "Do you sign models and verify signatures at deploy (deny unsigned)?", target: 3 },
  { id: 41, domain: "AI Model Security", text: "Do you run robustness testing (extraction, inversion, membership inference) in CI with thresholds?", target: 3 },
  { id: 42, domain: "AI Model Security", text: "Do you perform runtime behavioral monitoring and anomaly detection for models?", target: 3 },
  { id: 43, domain: "AI Model Security", text: "Do you apply rate limiting/throttling to reduce extraction/DoS risk?", target: 3 },
  { id: 44, domain: "AI Model Security", text: "Do you use predictive detection of model abuse based on telemetry?", target: 4 },
  { id: 45, domain: "AI Model Security", text: "Do you execute governed mitigations (throttle, key rotation, pin last-known-good) with rollback and audit?", target: 5 },

  // AI Monitoring & Threat Detection
  { id: 46, domain: "AI Monitoring & Threat Detection", text: "Do you collect full-stack AI telemetry (inputs, prompts, outputs, tool calls, retrievals)?", target: 3 },
  { id: 47, domain: "AI Monitoring & Threat Detection", text: "Do you monitor model drift and anomalies as part of operations?", target: 2 },
  { id: 48, domain: "AI Monitoring & Threat Detection", text: "Do you integrate AI-specific threat intelligence into detection logic?", target: 2 },
  { id: 49, domain: "AI Monitoring & Threat Detection", text: "Do you detect prompt injection, data leakage, and model extraction with tuned rules/ML?", target: 3 },
  { id: 50, domain: "AI Monitoring & Threat Detection", text: "Do you measure detector precision/recall and reduce false positives over time?", target: 4 },
  { id: 51, domain: "AI Monitoring & Threat Detection", text: "Do you use predictive threat detection algorithms to anticipate abuse patterns?", target: 4 },
  { id: 52, domain: "AI Monitoring & Threat Detection", text: "Do you support autonomous detection actions (throttle/block/escalate) under governed policies with rollback?", target: 5 },

  // AI Incident Response & Recovery
  { id: 53, domain: "AI Incident Response & Recovery", text: "Do you define AI-specific incident types, severities, and playbooks?", target: 2 },
  { id: 54, domain: "AI Incident Response & Recovery", text: "Can you rollback/pin a model version quickly during incidents?", target: 3 },
  { id: 55, domain: "AI Incident Response & Recovery", text: "Can you disable tools/functions and quarantine/rebuild vector indices on demand?", target: 3 },
  { id: 56, domain: "AI Incident Response & Recovery", text: "Do you purge/redact prompt logs and invalidate caches/tokens during incidents?", target: 3 },
  { id: 57, domain: "AI Incident Response & Recovery", text: "Do you integrate AI systems into DR/BCP with tested restoration procedures?", target: 3 },
  { id: 58, domain: "AI Incident Response & Recovery", text: "Do you measure AI-specific MTTD and MTTR with defined start/stop conditions?", target: 4 },
  { id: 59, domain: "AI Incident Response & Recovery", text: "Do you execute governed automated responses with killswitches and staged rollback?", target: 5 },

  // Red Teaming & Evaluation
  { id: 60, domain: "Red Teaming & Evaluation", text: "Do you perform AI threat modeling (MITRE ATLAS, STRIDE-for-ML) for priority systems?", target: 2 },
  { id: 61, domain: "Red Teaming & Evaluation", text: "Do you enforce pre-release red team gates for LLM/RAG and models with go/no-go thresholds?", target: 3 },
  { id: 62, domain: "Red Teaming & Evaluation", text: "Do you run continuous adversarial testing in CI (injection, extraction, inversion, poisoning, MIA)?", target: 3 },
  { id: 63, domain: "Red Teaming & Evaluation", text: "Do you track coverage across attack classes and close gaps?", target: 4 },
  { id: 64, domain: "Red Teaming & Evaluation", text: "Do you commission periodic third-party or independent red teaming?", target: 4 },
  { id: 65, domain: "Red Teaming & Evaluation", text: "Do you adapt test suites based on incidents and threat intel (policy-linked updates)?", target: 5 },

  // Human-in-the-Loop Security
  { id: 66, domain: "Human-in-the-Loop Security", text: "Do you vet annotators and enforce least-privilege access in labeling tools?", target: 2 },
  { id: 67, domain: "Human-in-the-Loop Security", text: "Do you operate segmented annotation environments with strict egress controls?", target: 3 },
  { id: 68, domain: "Human-in-the-Loop Security", text: "Do you use canary/watermarked data to detect leaks from labeling workflows?", target: 3 },
  { id: 69, domain: "Human-in-the-Loop Security", text: "Do you perform privacy QA audits and run incident drills for labeling processes?", target: 3 },
  { id: 70, domain: "Human-in-the-Loop Security", text: "Do you monitor for exfiltration (e.g., session anomalies, DLP) in labeling environments?", target: 4 },
  { id: 71, domain: "Human-in-the-Loop Security", text: "Do you apply governed automated controls (session alerts, dynamic masking) with approvals?", target: 5 },

  // AI Safety & Content Risk
  { id: 72, domain: "AI Safety & Content Risk", text: "Do you define safety policies for misuse/abuse and restricted domains with refusal guidance?", target: 2 },
  { id: 73, domain: "AI Safety & Content Risk", text: "Do you integrate safety evaluations (toxicity, bias/fairness, groundedness) into release criteria?", target: 3 },
  { id: 74, domain: "AI Safety & Content Risk", text: "Do you require human-in-the-loop oversight for sensitive tasks and escalation paths for harms?", target: 3 },
  { id: 75, domain: "AI Safety & Content Risk", text: "Do you set and monitor safety SLOs with alerting on regressions?", target: 4 },
  { id: 76, domain: "AI Safety & Content Risk", text: "Do you analyze policy evasion/jailbreak trends and tune defenses accordingly?", target: 4 },
  { id: 77, domain: "AI Safety & Content Risk", text: "Do you provide user-facing provenance/safety disclosures and adapt thresholds under attack with approvals?", target: 5 }
];




